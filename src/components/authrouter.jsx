import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./loginform";
import Signup from "./signup";

export default function AuthRouter() {
  const [page, setPage] = useState("login");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; background: #000; -webkit-font-smoothing: antialiased; }

        /* Cursor rules: text inputs = text cursor, everything else default */
        * { cursor: default; }
        input, textarea { cursor: text !important; }
        button, a, label[for], [role="button"], select { cursor: pointer !important; }
        input[disabled], button[disabled] { cursor: not-allowed !important; }

        ::selection { background: rgba(249,115,22,0.3); color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #f97316; }

        .auth-input::placeholder { color: #52525b; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Responsive: mobile vs desktop views */
        @media (max-width: 1023px) {
          .mobile-auth-view { display: flex !important; }
          .desktop-auth-view { display: none !important; }
        }
        @media (min-width: 1024px) {
          .mobile-auth-view { display: none !important; }
          .desktop-auth-view { display: block !important; min-height: 100vh; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {page === "login" ? (
          <motion.div key="login"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}>
            <Login onSwitchToSignup={() => setPage("signup")} />
          </motion.div>
        ) : (
          <motion.div key="signup"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}>
            <Signup onSwitchToLogin={() => setPage("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}