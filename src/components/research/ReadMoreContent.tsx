import {FC, useState} from 'react';

export const ReadMoreContent: FC<{ children: string, maxLines?: number }> = ({children, maxLines = 3}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-2xl">
      <div
        className={`
          ${isExpanded ? '' : `line-clamp-${maxLines}`}
          transition-all duration-300 min-h-0
        `}
      >
        {children}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 hover:scale-125 transition-colors duration-200"
      >
        <span className={'font-bold'}>
          {isExpanded ? 'Close' : 'Read more'}
        </span>
      </button>
    </div>
  );
};