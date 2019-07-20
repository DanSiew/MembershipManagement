export const AppConstant: any = {
  config: {
    contentType: 'Content-Type',
    applicationXform: 'application/x-www-form-urlencoded',
    bearer: 'Bearer ',
    constDebounceTime: 500,
    antiForgeryCookie: 'XSRF-TOKEN'
  },
  storageKey: {
    id: 'id',
    userToken: 'userToken',
    accessToken: 'accessToken',
    userRoleId: 'userRoleId',
    sub: 'sub',
    picture: 'picture'
  },
  api: {
    tokenAuth: '/api/token/auth'
  }
}
