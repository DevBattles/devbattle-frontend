function Section({ children, className = "" }) {
    return (
      <section className={className}>
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {children}
        </div>
      </section>
    );
  }
  
  export default Section;