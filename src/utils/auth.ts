const TokenKey = 'Token';
const RefreshToken = 'Refresh-Token';
const CorpId = 'Corp-Id';
const AppId = 'App-Id';
const OrgId = 'Org-Id';
const UserInfoType = 'User-Info';
const ClientIdKey = 'Client-Id';
const UnifiedPlatformInfoKey = 'Unified-Platform-Info';
const Secret = 'Secret-Id';

export function isIE() {
  const Edge = navigator.userAgent.indexOf('Edge') > -1;
  //@ts-ignore
  if (!!window.ActiveXObject || 'ActiveXObject' in window || Edge) return true;
  return false;
}

function setStorage(key, value) {
  sessionStorage.setItem(`M-${key}`, JSON.stringify({ expire: null, value }));
}

/**
 * token
 */

export function setToken(token) {
  return setStorage(TokenKey, token);
}

/**
 * 保存Corp-Id
 * @param {Object} id
 */
export function setCorpId(id) {
  return setStorage(CorpId, id);
}

/**
 * 保存Corp-Id
 * @param {Object} id
 */
export function setAppId(id) {
  return setStorage(AppId, id);
}

/**
 * 保存Org-Id
 * @param {Object} id
 */
export function setOrgId(id) {
  return setStorage(OrgId, id);
}

/**
 * Clientid缓存
 */
export function setClientId(clientId) {
  return setStorage(ClientIdKey, clientId);
}

/**
 * 保存refresh_token
 * @param {Object} token
 */
export function setRefreshToken(token) {
  return setStorage(RefreshToken, token);
}

/**
 * 用户信息
 */
export function setUserInfo(userInfo) {
  return setStorage(UserInfoType, userInfo);
}

/**
 * 统一平台登录信息缓存
 */
export function setUnifiedPlatformInfo(unifiedPlatformInfo) {
  return setStorage(UnifiedPlatformInfoKey, unifiedPlatformInfo);
}

setClientId;

/**
 * Clientid缓存
 */
export function setSecret(clientId) {
  return setStorage(Secret, clientId);
}
