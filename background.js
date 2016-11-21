/**
 * De-clutters the downloads folder by checking for the file
 * being downloaded. This is done by checking the MIME type of
 * the file being downloaded. The function always overwrites
 * any duplicate files.
 */
chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
  if (isPDF(item)) {
    suggest({
      filename: 'PDFs/' + item.filename,
      conflictAction: 'overwrite'
    });
  } else if (isZIP(item)) {
    suggest({
      filename: 'ZIPs/' + item.filename,
      conflictAction: 'overwrite'
    });
  } else if (isDocument(item)) {
    suggest({
      filename: 'docs/' + item.filename,
      conflictAction: 'overwrite'
    });
  }
  suggest({
    filename: item.filename,
    conflictAction: 'overwrite'
  });
});


/**
 * @param item
 * @return boolean
 */
function isPDF(item) {
  if (item.mime === "application/pdf" || item.filename.match(/\.pdf$/i)) return true;
  return false;
}

/**
 * @param item
 * @return boolean
 */
function isZIP(item) {
  if (item.filename.match(/\.(zip|rar)$/i)) return true;
  return false;
}

/**
 * @param item
 * @return boolean
 */
function isDocument(item) {
  if (item.filename.match(/\.(doc|docx)$/i)) return true;
}
