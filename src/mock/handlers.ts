import { rest } from 'msw';
import { BASE_URL } from '../const';
import MOCK_CARD, { MOCK_CARD_MORTY } from './MockData';

const handlers = [
  rest.get(`${BASE_URL}/${1}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_CARD));
  }),
  rest.get(`${BASE_URL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('name') === 'morty') {
      return res(ctx.status(200), ctx.json({ results: [MOCK_CARD_MORTY] }));
    }
    if (req.url.searchParams.get('name') === 'rick') {
      return res(ctx.status(200), ctx.json({ results: [MOCK_CARD] }));
    }
    if (!req.url.searchParams.get('name')) {
      return res(
        ctx.status(200),
        ctx.json({ results: [MOCK_CARD, MOCK_CARD_MORTY] })
      );
    }
    return res(ctx.status(404));
  }),
];

export default handlers;
