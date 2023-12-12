export interface ResponseCheckVersionDto {
  isUptodate: boolean;
  forceUpdate: boolean;
}

export interface ResponseDataDto<T> {
  message: string;
  data: T;
}
