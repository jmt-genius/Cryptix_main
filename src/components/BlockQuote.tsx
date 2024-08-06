export function BlockQuote({text}:{text:string}) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {text}
      </blockquote>
    )
  }
  