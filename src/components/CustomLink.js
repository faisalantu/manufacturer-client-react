import React from 'react';
import { useMatch, useResolvedPath, Link } from 'react-router-dom';

function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          className={`${match?"text-primary font-bold":null}`}
          to={to}
          {...props}
        >
          {children}
        </Link>
        
      </div>
    );
  }

export default CustomLink;