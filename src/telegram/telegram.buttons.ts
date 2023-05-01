import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.inlineKeyboard([
    // Markup.button.callback('Set up Email', 'email'),
    // Markup.button.callback('Set up University', 'university'),
  ]);
}
