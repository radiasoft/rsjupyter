# -*- coding: utf-8 -*-

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

import os
import sys
from distutils.core import setup

if 'develop' in sys.argv or any(a.startswith('bdist') for a in sys.argv):
    import setuptools

setup_args = dict(
    name                 = 'rsjupyter',
    version              = '0.0.1',
    packages             = ['rsjupyter'],
    author               = 'RadiaSoft LLC',
    author_email         = 'pip@radiasoft.net',
    zip_safe             = False,
    data_files           = [(
        'share/jupyter/labextensions/rsjupyter', [
            'rsjupyter/static/rsjupyter.bundle.js',
            'rsjupyter/static/rsjupyter.bundle.js.manifest',
            'rsjupyter/static/rsjupyter.css',
        ])],
    include_package_data = True,
    install_requires = [
        'jupyterlab>=0.8.0',
    ]
)

if __name__ == '__main__':
    setup(**setup_args)
