# Redmine View Customize Plugin Script for HOME

## Description

In the HOME screen, the display area is divided into left and right. The following class names are defined for each tag

- '.splitcontentleft'
- '.splitcontentright'

'.splitcontentleft' is displayed the welcome message.

Insert React Component into '.splitcontentright'.

## Usage

Register js file to View Customize.

## Demo

![before](screenshots/01_01.JPG)

On the left side, the welcome message described in the setting is displayed. But the right side of the screen is blank. "MOTTAINAI!"

![after](screenshots/01_02.JPG)

With this script, Insert statistics graphs and ticket search screens.

## Requirement

This script use

- React
- Redux
- babel
- react-bootstrap
- immutable.js
- plotly

This script also use js-yaml, because my system uses yaml as a custom field. Please adjust to your environment.
