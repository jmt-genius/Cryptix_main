export function H1({text,otherClasses}:{text:string,otherClasses?:string}) {
    return (
      <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${otherClasses}`}>
        {text}
      </h1>
    )
  }
  