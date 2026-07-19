function Container({ children }) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        {children}
      </div>
    );
  }
  
  export default Container;