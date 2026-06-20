export default function SiginIn() {
  return (
    <section className="auth-container">
      <div className="app-card ">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-6xl"> 💰</span>
          <p className="text-3xl font-black tracking-tight text-(--text) mb-2">
            Spends
          </p>
          <p className="text-sm text-(--nav-text)">Sign in to your account</p>
        </div>
        {/* body */}

        <form>
          {/* Email */}
          <div className="space-y-5">
            <label className="text-sm font-medium text-(--text)">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full h-12 px-4 rounded-2xl border border-(--border)
                        text-sm bg-(--surface) text-(--text) placeholder:text-(--nav-text)
                        outline-none transition-all focus:border-blue-500 focus:ring-blue-500/10
                        "
            />
          </div>

          {/* Password */}
          <div className="space-y-5">
            <label className="text-sm font-medium text-(--text)">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 px-4 rounded-2xl border border-(--border)
                        text-sm bg-(--surface) text-(--text) placeholder:text-(--nav-text)
                        outline-none transition-all focus:border-blue-500 focus:ring-blue-500/10
                        "
            />
          </div>
        </form>
        {/* Footer */}
      </div>
    </section>
  );
}
