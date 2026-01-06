import React from 'react';

export interface DocSection {
  id: string;
  title: string;
  category: string;
  content: React.ReactNode;
  keywords: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  snippet: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light' // Prepared for future toggle, default is dark per brand
}