import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ crumbs }) => {
  if (!crumbs || crumbs.length === 0) return null;

  return (
    <motion.nav 
      className="breadcrumbs"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="wrap breadcrumbs-inner">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <React.Fragment key={index}>
              {crumb.path && !isLast ? (
                <Link to={crumb.path} className="bc-link">
                  {crumb.label}
                </Link>
              ) : (
                <span className="bc-current">{crumb.label}</span>
              )}
              {!isLast && <span className="bc-sep">/</span>}
            </React.Fragment>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Breadcrumbs;
