const express = require('express');
const router = express.Router();
const Doc = require('../models/doc');

// All DOCs route
router.get('/', async (req, res) => {
  let searchOptions = {};
  let query = Doc.find();
  if (req.query.Id_Doc != null && req.query.Id_Doc !== '') {
    // searchOptions.Id_Doc = new req.query.ID_Doc();
    query = query.regex('Id_Doc', new RegExp(req.query.Id_Doc, 'i'));
  }
  if (req.query.docName != null && req.query.docName !== '') {
    query = query.regex('docName', new RegExp(req.query.docName, 'i'));
  }
  if (req.query.docText != null && req.query.docText !== '') {
    query = query.regex('docText', new RegExp(req.query.docText, 'i'));
  }
  if (req.query.docElement != null && req.query.docElement !== '') {
    query = query.regex('docElement', new RegExp(req.query.docElement, 'i'));
  }
  try {
    const docs = await query.exec();
    res.render('docs/index', { docs: docs, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

// New DOCs route
router.get('/new', (req, res) => {
  res.render('docs/new', { doc: new Doc() });
});

// Create DOC Route
router.post('/', async (req, res) => {
  const doc = new Doc({
    Id_Doc: req.body.Id_Doc,
    docName: req.body.docName,
    docText: req.body.docText,
    docElement: req.body.docElement,
  });
  try {
    const newDoc = await doc.save();
    // res.redirect(`docs/${newDoc.id}`);
    res.redirect(`docs`);
  } catch {
    res.render('docs/new', {
      doc: doc,
      errorMessage: 'Error creating DOCument',
    });
  }
});
module.exports = router;
