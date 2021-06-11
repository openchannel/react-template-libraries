import { AppModel } from '../ui/common/molecules/oc-app-card/types';

export const isDev = (): boolean => process.env.NODE_ENV === 'development';

export const isStorybook = (): boolean => process.env.STORYBOOK === 'true';

const isoCurrencyCode: any = {
      USD: '$',
      EUR: '€',
      CNY: '¥',
      GBP: '£',
  };

export const transformCurrency = (model: AppModel): string => {
      let price = '';

      if (!model || model.type === 'free') {
          price = 'Free';
      } else {
          price = model.currency ? getCurrency(model.currency) : '';
          price += model.price / 100;
          if (model && model.type === 'recurring') {
              price += '/' + model.billingPeriod?.substring(0, 3);
          }
      }
      return price;
  }

const getCurrency = (currency: string): string => {
      if (Object.keys(isoCurrencyCode).includes(currency)) {
          return isoCurrencyCode[currency];
      } else {
          return '$';
      }
  }

export const truncateWithHTML = (htmlText: string, truncateTo: number): string => {
  const substrings = htmlText.split(/(<[^>]*>)/g);
  let count = 0;
  const truncated = [];
  for (const substr of substrings) {
    if (!substr.startsWith('<')) {
      if (count > truncateTo) {
        continue;
      } else if (substr.length > truncateTo - count - 1) {
        truncated.push(`${substr.substring(0, truncateTo - count)}...`);
        return truncated.join('');
      } else {
        truncated.push(substr);
      }
      count += substr.length;
    } else {
      truncated.push(substr);
    }
  }
  return truncated.join('');
};

export const getTextFromHtml = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};