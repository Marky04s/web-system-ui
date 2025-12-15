export default defineNuxtRouteMiddleware((to) => {
  // Check if user is authenticated
  const isAuthenticated = process.client ? localStorage.getItem('isAuthenticated') === 'true' : false

  // If trying to access login page and already authenticated, redirect to dashboard
  if (to.path === '/login' && isAuthenticated) {
    return navigateTo('/')
  }

  // If not authenticated and trying to access protected routes, redirect to login
  if (to.path !== '/login' && !isAuthenticated) {
    return navigateTo('/login')
  }
})
