export interface Todo {
  /**
   * @minLength 5
   * @maxLength 5
   */
  bar: string;
}

export interface Shape {
  /**
   * The size of the shape.
   *
   * @minimum 0
   * @TJS-type integer
   */
  size: number;
  todos: Todo[];
}

export enum Role {
  Editor = 'Editor',
  Subscriber = 'Subscriber',
}

export interface Login {
  /**
   * Username
   */
  username: string;

  /**
   * Password
   */
  password: string;

  /**
   * Path
   */
  path?: string;

  /**
   * Role
   *
   * @default Editor
   */
  role?: Role;
}
