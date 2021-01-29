export interface TokensType {
  accessToken: string;
  refreshToken: string;
}

export interface FileType {
  fileName: string;
  filePath: string;
  fileType: string;
}

export interface UploadResponse {
  key: string;
  url: string;
}
