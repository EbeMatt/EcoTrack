export function parseToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedToken = JSON.parse(atob(base64));
      return decodedToken;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }