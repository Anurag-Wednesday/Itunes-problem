/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#fcedda';
const text = '#212529';
const whiteText = 'white';
const secondary = '#f8c49c';
const success = '#28a745';
const background = '#231f20';
const error = '#dc3545';
const gotoStories = '#1890ff';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  background,
  whiteText,
  secondary,
  success,
  error,
  gotoStories,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
