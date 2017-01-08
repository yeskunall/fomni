/**
 * The MIT License
 * Copyright (c) 2015-2016 Kunall Banerjee
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {

  if(fromFb(item)) {
    suggest({
      filename: 'facebook/' + item.filename,
      conflictAction: 'overwrite'
    });
  } else if (fromImgur(item)) {
    suggest({
      filename: 'Imgur/' + item.filename,
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

 /**
  * Returns true if content is being
  * downloaded from Imgur
  *
  * @param item
  * @return boolean
  */
  function fromImgur(item) {
    if (item.url.match(/imgur/)) return true;
  }
