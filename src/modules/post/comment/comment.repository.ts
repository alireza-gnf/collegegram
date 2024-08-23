import { DataSource, Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./model/comment.model";
import { v4 } from "uuid";
import { CommentEntity } from "./entity/comment.entity";
import { GetCommentsDto } from "./dto/get-comments.dto";

export interface ICommentRepository {
  create(comment: CreateCommentDto): Promise<Comment>;
  getAll(query: GetCommentsDto): Promise<Comment[] | null>;
}

export class CommentRepository implements ICommentRepository {
  private repo: Repository<CommentEntity>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(CommentEntity);
  }

  async create(comment: CreateCommentDto): Promise<Comment> {
    return await this.repo.save({ id: v4(), ...comment });
  }

  async getAll(query: GetCommentsDto): Promise<Comment[] | null> {
    return await this.repo.find({
      where: { postId: query.postId },
      order: { createdAt: "DESC" },
      take: query.take,
      skip: query.skip,
    });
  }
}
