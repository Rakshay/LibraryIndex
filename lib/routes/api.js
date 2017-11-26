'use strict';

import { Router as routerFactory } from 'express';
import * as goodReadsController from '../controllers/goodReads';

let router = routerFactory();

router.route('/api/books')
  .get((req, res) => {
    goodReadsController.getBooks(req.query.bookTitle, req.query.pageIndex)
      .then((books) => {
        res.status(200).json(books);
      });
  });

export default router;
