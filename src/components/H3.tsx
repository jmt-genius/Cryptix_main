export function H3({text,otherClasses}:{text:string,otherClasses?:string}) {
    return (
      <h3 className={`scroll-m-20  text-2xl font-semibold tracking-tight ${otherClasses}`}>
        {text}
      </h3>
    )
  }
  