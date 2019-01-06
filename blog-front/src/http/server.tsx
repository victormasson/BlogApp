export default class Server {
  static url: string = 'http://localhost:5000/'
  static api: string = 'api/'
  static socket: string = 'socket/'

  /**
   * @returns the url
   */
  public static getUrl(): string {
    return Server.url
  }

  public static getApiUrl(): string {
    return Server.url + Server.api
  }

  public static getApiArticles(): string {
    return Server.getApiUrl() + 'articles'
  }

  public static getApiArticleById(): string {
    return Server.getApiUrl() + 'articles/'
  }

  public static getApiTags(): string {
    return Server.getApiUrl() + 'tags'
  }

  public static getUrlChat(): string {
    return Server.url + Server.socket + 'chat'
  }
}