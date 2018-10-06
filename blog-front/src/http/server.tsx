export default class Server {
  static url: string = 'http://localhost:4000/'
  static api: string = 'api'

  public static getUrl(): string {
    return Server.url
  }

  public static getUrlApi(): string {
    return Server.url + Server.api
  }

  public static getApiArticles(): string {
    return Server.getUrlApi() + '/articles'
  }

  public static getApiTags(): string {
    return Server.getUrlApi() + '/tags'
  }
}