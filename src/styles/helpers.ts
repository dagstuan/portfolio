// tslint:disable-next-line: no-submodule-imports
import { Styles } from '@material-ui/styles/withStyles';
import { makeStyles, useTheme as materialUseTheme } from '@material-ui/styles';
import { Theme } from './theme';

export const makeThemedStyles = <
  Props extends {} = any,
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>
) => makeStyles<Theme, Props, ClassKey>(styles);

export const useTheme = () => materialUseTheme<Theme>();
