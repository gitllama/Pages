# Redmine View Customize Plugin Script for common

## Description

View Customize Plugin inserts a script, when the path pattern matches. Common scripts and variables can be written in the same place.
However, it is necessary to pay attention to the order of execution depending on the insertion order.

When using ```<script type="text/javascript">```, global variables can be defined. But, when using ```<script type="text/babel">```, Scope is defined by script tags. To use global variables, write like ```window.hoge = hoge```.

## Usage

Register js file to View Customize.
