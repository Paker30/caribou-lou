'use strict';

const getSection = (db) => {
  return (name) => db.collection('sections').findOne({ section_id: name });
};

module.exports = (db) => ({
  find: getSection(db)
});
