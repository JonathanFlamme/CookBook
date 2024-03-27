export interface UploadImage {
  status_code: number;
  status_txt: string;
  success: {
    message: string;
    code: number;
  };
  image: {
    name: string;
    extension: 'string';
    size: number;
    width: number;
    height: number;
    date: string;
    filename: string;
    size_formatted: string;
    mime: string;
    url: string;
    url_viewer: string;
  };
}

export interface ResponseApi {
  data: {
    id: string;
    title: string;
    url: string;
  };
}
