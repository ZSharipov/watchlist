import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  userName: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;
}
