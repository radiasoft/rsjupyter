# -*- coding: utf-8 -*-

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

import os
import sys
from distutils.core import setup

if 'develop' in sys.argv or any(a.startswith('bdist') for a in sys.argv):
    import setuptools

setup_args = dict(
    author               = 'RadiaSoft LLC',
    author_email         = 'pip@radiasoft.net',
    include_package_data = True,
    install_requires     = [
        'jupyterlab>=0.8.0',
    ],
    name                 = 'rsjupyter',
    packages             = ['rsjupyter'],
    package_data         = {
        'rsjupyter': ['static/*.js', 'static/*.css', 'static/*.manifest'],
    },
    version              = '0.0.1',
    zip_safe             = False,
)

if __name__ == '__main__':
    setup(**setup_args)
