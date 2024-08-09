export function H2({text,otherClasses}:{text:string,otherClasses?:string}) {
    return (
      <h2 className={`scroll-m-20 border-b-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${otherClasses}`}>
        {text}
      </h2>
    )
  }
   