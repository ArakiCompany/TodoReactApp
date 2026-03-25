export function useAuthContext() {
  function getAuthContext() {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    return {
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    };
  }

  return { getAuthContext };
}