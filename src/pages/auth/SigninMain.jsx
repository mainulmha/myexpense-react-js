
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import OAuthButtons from "@/components/ui/OAuthButtons";

// export default function Demo() {

//     const [showPassword, setShowPassword] = useState(false);

//     return (

//         <section
//             className="
//                 min-h-screen

//                 bg-[var(--bg)]

//                 flex
//                 items-center
//                 justify-center

//                 px-4
//                 py-10
//             "
//         >

//             {/* CARD */}

//             <div
//                 className="
//                     w-full
//                     max-w-md

//                     rounded-[2rem]

//                     border
//                     border-[var(--border)]

//                     bg-[var(--card)]

//                     p-6
//                     sm:p-8

//                     shadow-xl
//                 "
//             >

//                 {/* HEADER */}

//                 <div className="text-center mb-8">

//                     <div>
//                         <span className="text-6xl">
//                             💰
//                         </span>
//                     </div>

//                     <h1
//                         className="
//                             text-3xl
//                             font-black

//                             tracking-tight

//                             text-[var(--text)]

//                             mb-2
//                         "
//                     >
//                         Spends
//                     </h1>

//                     <p
//                         className="
//                             text-sm

//                             text-[var(--nav-text)]
//                         "
//                     >
//                         Sign in to your account
//                     </p>

//                 </div>

//                 {/* FORM */}

//                 <form className="space-y-5">

//                     {/* EMAIL */}

//                     <div className="space-y-2">

//                         <label
//                             className="
//                                 text-sm
//                                 font-medium

//                                 text-[var(--text)]
//                             "
//                         >
//                             Email Address
//                         </label>

//                         <input
//                             type="email"
//                             placeholder="john@example.com"
//                             className="
//                                 w-full
//                                 h-12

//                                 px-4

//                                 rounded-2xl

//                                 border
//                                 border-[var(--border)]

//                                 bg-[var(--surface)]

//                                 text-sm
//                                 text-[var(--text)]

//                                 placeholder:text-[var(--nav-text)]

//                                 outline-none

//                                 transition-all

//                                 focus:border-blue-500
//                                 focus:ring-4
//                                 focus:ring-blue-500/10
//                             "
//                         />

//                     </div>

//                     {/* PASSWORD */}

//                     <div className="space-y-2">

//                         <label
//                             className="
//                                 text-sm
//                                 font-medium

//                                 text-[var(--text)]
//                             "
//                         >
//                             Password
//                         </label>

//                         <div className="relative">

//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Enter your password"
//                                 className="
//                                     w-full
//                                     h-12

//                                     px-4
//                                     pr-12

//                                     rounded-2xl

//                                     border
//                                     border-[var(--border)]

//                                     bg-[var(--surface)]

//                                     text-sm
//                                     text-[var(--text)]

//                                     placeholder:text-[var(--nav-text)]

//                                     outline-none

//                                     transition-all

//                                     focus:border-blue-500
//                                     focus:ring-4
//                                     focus:ring-blue-500/10
//                                 "
//                             />

//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="
//                                     absolute
//                                     right-4
//                                     top-1/2
//                                     -translate-y-1/2

//                                     text-[var(--nav-text)]

//                                     hover:text-[var(--text)]

//                                     transition-colors
//                                 "
//                             >

//                                 {
//                                     showPassword
//                                         ? <EyeOff size={18} />
//                                         : <Eye size={18} />
//                                 }

//                             </button>

//                         </div>

//                     </div>

//                     {/* OPTIONS */}

//                     <div
//                         className="
//                             flex
//                             items-center
//                             justify-between
//                         "
//                     >

//                         <label
//                             className="
//                                 flex
//                                 items-center
//                                 gap-2

//                                 text-sm

//                                 text-[var(--nav-text)]

//                                 cursor-pointer
//                             "
//                         >

//                             <input
//                                 type="checkbox"
//                                 className="rounded"
//                             />

//                             Remember me

//                         </label>

//                         <button
//                             type="button"
//                             className="
//                                 text-sm

//                                 text-blue-500
//                                 hover:text-blue-400

//                                 transition-colors
//                             "
//                         >
//                             Forgot Password?
//                         </button>

//                     </div>

//                     {/* BUTTON */}

//                     <button
//                         type="submit"
//                         className="
//                             w-full
//                             h-12

//                             rounded-2xl

//                             bg-blue-600
//                             hover:bg-blue-500

//                             text-sm
//                             font-semibold
//                             text-white

//                             transition-all

//                             active:scale-[0.98]
//                         "
//                     >
//                         Sign In
//                     </button>

//                     {/* DIVIDER */}

//                     <div className="relative py-1">

//                         <div
//                             className="
//                                 absolute
//                                 inset-0

//                                 flex
//                                 items-center
//                             "
//                         >

//                             <div
//                                 className="
//                                     w-full

//                                     border-t
//                                     border-[var(--border)]
//                                 "
//                             />

//                         </div>

//                         <div className="relative flex justify-center">

//                             <span
//                                 className="
//                                     px-3

//                                     bg-[var(--card)]

//                                     text-xs
//                                     font-medium

//                                     tracking-widest

//                                     text-[var(--nav-text)]
//                                 "
//                             >
//                                 OR CONTINUE WITH
//                             </span>

//                         </div>

//                     </div>

//                     {/* OAUTH */}

//                     <OAuthButtons />

//                     {/* FOOTER */}

//                     <div className="pt-2 text-center">

//                         <p
//                             className="
//                                 text-sm

//                                 text-[var(--nav-text)]
//                             "
//                         >

//                             Don&apos;t have an account?{" "}

//                             <button
//                                 type="button"
//                                 className="
//                                     font-medium

//                                     text-blue-500
//                                     hover:text-blue-400

//                                     transition-colors
//                                 "
//                             >
//                                 Sign up
//                             </button>

//                         </p>

//                     </div>

//                 </form>

//             </div>

//         </section>
//     );
// }
