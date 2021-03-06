import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let cancel = false;
    getSubs().then((res) => {
      if (cancel) return;
      setSubs(res.data);
      setLoading(false);
    });
    return () => {
      cancel = true;
    };
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outline-secondary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/sub/${s.slug}`} className="text-secondary">
          {s.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
