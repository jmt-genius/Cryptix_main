export function Para({text,otherClasses}:{text:string,otherClasses?:string}) {
    return (
      <p className={`leading-7 [&:not(:first-child)]:mt-6 ${otherClasses}`}>
        {text}
      </p>
    )
  }
  