function Footer() {
    return (
      <footer className="border-t border-slate-800 bg-[#030712]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 py-12 lg:flex-row">
  
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Dev</span>Battles
            </h2>
  
            <p className="mt-3 text-slate-400">
              Learn. Compete. Grow.
            </p>
          </div>
  
          <div className="flex gap-6 text-slate-400">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
  
        </div>
  
        <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} DevBattles. All rights reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;