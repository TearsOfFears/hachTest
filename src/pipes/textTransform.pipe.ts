import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { replaceLetters } from '../utils/replaceLetters.utils';

@Injectable()
export class TextTransformPipe implements PipeTransform {
  transform(value: any) {
    const question = replaceLetters(value.question);
    const variants = value.variants.map((el) => replaceLetters(el));
    return { ...value, question, variants };
  }
}
