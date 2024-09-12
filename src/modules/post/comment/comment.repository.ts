import { DataSource, Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import {
  Comment,
  CommentNotification,
  ShowComment,
} from "./model/comment.model";
import { v4 } from "uuid";
import { CommentEntity } from "./entity/comment.entity";
import { GetCommentsDto } from "./dto/get-comments.dto";
import { CommentId } from "./model/comment-id";
import { PostId } from "../model/post-id";

export interface ICommentRepository {
  create(comment: CreateCommentDto): Promise<Comment>;
  findById(id: CommentId): Promise<Comment | null>;
  getCommentForNotificationById(
    id: CommentId
  ): Promise<CommentNotification | null>;
  getAll(query: GetCommentsDto): Promise<ShowComment[] | null>;
  countComments(postId: PostId): Promise<number>;
}

export class CommentRepository implements ICommentRepository {
  private repo: Repository<CommentEntity>;

  constructor(private dataSource: DataSource) {
    this.repo = dataSource.getRepository(CommentEntity);
  }

  async create(comment: CreateCommentDto): Promise<Comment> {
    return await this.repo.save({ id: v4(), ...comment });
  }

  async findById(id: CommentId): Promise<Comment | null> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async getCommentForNotificationById(
    id: CommentId
  ): Promise<CommentNotification | null> {
    return await this.repo
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.post", "post")
      .leftJoinAndSelect("post.media", "media")
      .select(["comment.id", "comment.description", "post.id", "media"])
      .where("comment.id = :id", { id })
      .getOne();
  }

  async getAll(query: GetCommentsDto): Promise<ShowComment[] | null> {
    return await this.repo.find({
      where: { postId: query.postId },
      order: { createdAt: "DESC" },
      relations: ["user"],
      select: {
        id: true,
        postId: true,
        description: true,
        createdAt: true,
        parentId: true,
        user: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });
  }

  async countComments(postId: PostId): Promise<number> {
    return await this.repo.countBy({ postId: postId });
  }
}
