import app from '../backend/app.js';

export default function handler(request, response) {
  return app(request, response);
}


