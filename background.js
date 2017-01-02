/**
 * De-clutters the downloads folder by checking the MIME type of
 * the file being downloaded and sorts them into
 * appropriate folders
 */
chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {

  if(fromFb(item)) {
    suggest({
      filename: 'facebook/' + item.filename,
      conflictAction: 'overwrite'
    });
  } else if (isPDF(item)) {
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
      conflictAction: 'prompt'
    });
  }
  suggest({
    filename: item.filename,
    conflictAction: 'prompt'
  });
});

/**
 * Returns true if the file MIME type is application/pdf
 * or if the file extension matches the regex expression
 *
 * @param item
 * @return boolean
 */
function isPDF(item) {
  if (item.mime === "application/pdf" || item.filename.match(/\.pdf$/i)) return true;
  return false;
}

/**
 * Returns true if the file extension matches the
 * regex expression
 *
 * @param item
 * @return boolean
 */
function isZIP(item) {
  if (item.filename.match(/\.(zip|rar)$/i)) return true;
  return false;
}

/**
 * Returns true if the file extension matches the
 * regex expression
 *
 * @param item
 * @return boolean
 */
function isDocument(item) {
  if (item.filename.match(/\.(doc|docx)$/i)) return true;
}

/**
 * Returns true if content is being
 * downloaded from Facebook
 *
 * @param item
 * @return boolean
 */
 function fromFb(item) {
   if (item.url.match(/facebook/)) return true;
 }
