/**
 * Returns publicPath from env.
 * 
 * @return {String} publicPath
 */
export function getPublicPath() {
  const path = process.env.PUBLIC_URL || '';
  return path.slice(0,-1);
}

/**
 * Creates csv data.
 *
 * @see {@link // https://en.wikipedia.org/wiki/Comma-separated_values#Basic_rules|reference}
 * @param {Array} data Array of data
 * @param {String} [header=''] Optional csv header
 * @param {String} [delimiter=','] Optional delimiter
 * @return {String} CSV data
 */
export function createCSVData(data, header = '', delimiter = ',') {
  const eol = '\r\n';
  let csv = '';

  if (header && header.length > 0) {
    csv += header + eol;
  }

  const processRow = (row) => {
    row = row.map(field => {
      field = field.replace(/"/g, '""');
      if (field.search(/(\n|")/) > -1 || field.includes(delimiter)) {
        return `"${field}"`;
      }
      return field;
    });

    row = row.join(delimiter);

    return row + eol;
  };

  data.forEach(row => {
    csv += processRow(row);
  });

  return csv;
}