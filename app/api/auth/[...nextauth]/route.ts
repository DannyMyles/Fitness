import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }

          const backendBaseUrl = process.env.BACKEND_URL || 'https://istc-admin.onrender.com'
          const backendUrl = `${backendBaseUrl}/api/v1/auth/login`
          
          console.log('[NextAuth] Attempting login to:', backendUrl)
          
          const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          console.log('[NextAuth] Login response status:', response.status)
          
          // Read raw response first
          const responseText = await response.text()
          console.log('[NextAuth] Login response raw:', responseText)

          if (!response.ok) {
            let errorData
            try {
              errorData = JSON.parse(responseText)
            } catch {
              throw new Error(`Login failed with status: ${response.status}`)
            }
            throw new Error(errorData.message || errorData.error || "Authentication failed")
          }

          // Parse successful response
          let data
          try {
            data = JSON.parse(responseText)
          } catch {
            throw new Error("Invalid JSON response from server")
          }

          console.log('[NextAuth] Parsed response data:', JSON.stringify(data, null, 2))

          // Handle different response formats
          let userData: any = null
          let token: string | null = null

          // Format 1: { message: "...", user: { id, name, email, token: "..." } } - token INSIDE user
          if (data.user && typeof data.user === 'object' && data.user.token) {
            userData = data.user
            token = data.user.token
            console.log('[NextAuth] Format: token inside user object')
          }
          // Format 2: { message: "...", user: {...}, token: "..." } - token at root with user
          else if (data.user && typeof data.user === 'object' && data.token) {
            userData = data.user
            token = data.token
            console.log('[NextAuth] Format: token at root with user object')
          }
          // Format 3: { user: {...}, token: "..." }
          else if (data.user && data.token) {
            userData = data.user
            token = data.token
            console.log('[NextAuth] Format: user and token at root')
          }
          // Format 4: { user: {...}, accessToken: "..." }
          else if (data.user && data.accessToken) {
            userData = data.user
            token = data.accessToken
            console.log('[NextAuth] Format: user and accessToken at root')
          }
          // Format 5: { data: {...}, token: "..." }
          else if (data.data && data.token) {
            userData = data.data
            token = data.token
            console.log('[NextAuth] Format: data and token at root')
          }
          // Format 6: { data: {...}, accessToken: "..." }
          else if (data.data && data.accessToken) {
            userData = data.data
            token = data.accessToken
            console.log('[NextAuth] Format: data and accessToken at root')
          }
          // Format 7: Direct response with token at root
          else if (data.token) {
            userData = data
            token = data.token
            console.log('[NextAuth] Format: token only at root')
          }
          // Format 8: Direct response with accessToken at root
          else if (data.accessToken) {
            userData = data
            token = data.accessToken
            console.log('[NextAuth] Format: accessToken only at root')
          }
          // Format 9: user directly at root with id
          else if (data._id || data.id) {
            userData = data
            token = data.token || data.accessToken || null
            console.log('[NextAuth] Format: user directly at root')
          }
          else {
            console.error('[NextAuth] Unknown response format:', data)
            throw new Error("Unable to parse user data from server response")
          }

          if (!token) {
            console.error('[NextAuth] No token found in response. userData:', JSON.stringify(userData))
            throw new Error("No token received from server")
          }

          console.log('[NextAuth] Successfully authenticated user:', userData?.email)

          return {
            id: userData._id || userData.id || userData.userId || '',
            email: userData.email || credentials.email,
            name: userData.name || userData.username || userData.fullName || "User",
            role: userData.role || userData.roleName || "user",
            accessToken: token,
          }
        } catch (error: any) {
          console.error("[NextAuth] Authorization error:", error.message)
          throw new Error(error.message || "Authentication failed")
        }
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.accessToken = user.accessToken
        console.log('[NextAuth] JWT callback - initial sign in, token:', token.accessToken?.substring(0, 20) + '...')
      }
      
      // Handle session update (e.g., after token refresh)
      if (trigger === 'update' && session) {
        if (session.accessToken) {
          token.accessToken = session.accessToken
        }
        if (session.name) {
          token.name = session.name
        }
      }
      
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.accessToken = token.accessToken as string
        console.log('[NextAuth] Session callback - accessToken set:', session.user.accessToken?.substring(0, 20) + '...')
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every hour
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

