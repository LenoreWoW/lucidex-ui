'use client';

import React, { useState } from 'react';
import { EnhancedPreviewSystem } from './PreviewSystem';

const demoPresets = [
  {
    id: 'button-variants',
    name: 'Button Variants',
    description: 'Different button styles and states',
    content: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 20px; max-width: 600px;">
        <h2 style="width: 100%; margin: 0 0 16px 0; color: #1a1a1a; font-size: 24px; font-weight: bold;">Button Components</h2>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; width: 100%;">
          <button style="background: #B8860B; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
            Primary Button
          </button>
          <button style="background: transparent; color: #B8860B; border: 2px solid #B8860B; padding: 10px 22px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
            Secondary Button
          </button>
          <button style="background: #8B0000; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
            Danger Button
          </button>
          <button style="background: #f5f5f5; color: #999; border: 1px solid #ddd; padding: 12px 24px; border-radius: 8px; cursor: not-allowed; font-weight: 600;">
            Disabled Button
          </button>
        </div>

        <div style="width: 100%; margin-top: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 18px; font-weight: 600;">Button Sizes</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
            <button style="background: #B8860B; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Small</button>
            <button style="background: #B8860B; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px;">Medium</button>
            <button style="background: #B8860B; color: white; border: none; padding: 16px 32px; border-radius: 10px; cursor: pointer; font-size: 16px;">Large</button>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'card-layout',
    name: 'Card Layout',
    description: 'Responsive card grid layout',
    content: `
      <div style="padding: 20px; max-width: 800px;">
        <h2 style="margin: 0 0 24px 0; color: #1a1a1a; font-size: 24px; font-weight: bold;">Card Components</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #B8860B, #8B0000); border-radius: 8px; margin-bottom: 16px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">Feature Card</h3>
            <p style="margin: 0 0 16px 0; color: #666; font-size: 14px; line-height: 1.5;">
              This is a sample card with some descriptive text to show how content flows in different layouts.
            </p>
            <button style="background: #B8860B; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px;">Learn More</button>
          </div>

          <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #8B0000, #B8860B); border-radius: 8px; margin-bottom: 16px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">Analytics Card</h3>
            <p style="margin: 0 0 16px 0; color: #666; font-size: 14px; line-height: 1.5;">
              Display important metrics and data visualizations in a clean, organized layout.
            </p>
            <div style="display: flex; justify-content: space-between; margin-top: 16px;">
              <span style="color: #374151; font-weight: 600;">24.5k</span>
              <span style="color: #10b981; font-size: 12px;">+12%</span>
            </div>
          </div>

          <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 8px; margin-bottom: 16px;"></div>
            <h3 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">Integration Card</h3>
            <p style="margin: 0 0 16px 0; color: #666; font-size: 14px; line-height: 1.5;">
              Connect with external services and APIs seamlessly within your application.
            </p>
            <div style="display: flex; gap: 8px;">
              <button style="background: transparent; color: #374151; border: 1px solid #d1d5db; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Configure</button>
              <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">Connect</button>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'form-components',
    name: 'Form Components',
    description: 'Various form inputs and controls',
    content: `
      <div style="max-width: 480px; padding: 20px;">
        <h2 style="margin: 0 0 24px 0; color: #1a1a1a; font-size: 24px; font-weight: bold;">Form Components</h2>
        <form style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <label style="display: block; margin-bottom: 6px; color: #374151; font-size: 14px; font-weight: 500;">Full Name</label>
            <input type="text" placeholder="Enter your full name" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s;" />
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: #374151; font-size: 14px; font-weight: 500;">Email Address</label>
            <input type="email" placeholder="you@example.com" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s;" />
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: #374151; font-size: 14px; font-weight: 500;">Country</label>
            <select style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; background: white;">
              <option>Select your country</option>
              <option>Qatar</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>

          <div>
            <label style="display: block; margin-bottom: 6px; color: #374151; font-size: 14px; font-weight: 500;">Message</label>
            <textarea placeholder="Tell us more about your project..." rows="4" style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; resize: vertical; transition: border-color 0.2s;"></textarea>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" id="terms" style="width: 16px; height: 16px;" />
            <label for="terms" style="color: #374151; font-size: 14px;">I agree to the terms and conditions</label>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 8px;">
            <button type="submit" style="flex: 1; background: #B8860B; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Submit</button>
            <button type="button" style="background: transparent; color: #374151; border: 1px solid #d1d5db; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Cancel</button>
          </div>
        </form>
      </div>
    `,
  },
  {
    id: 'navigation',
    name: 'Navigation Components',
    description: 'Navigation menus and breadcrumbs',
    content: `
      <div style="max-width: 800px; padding: 20px;">
        <h2 style="margin: 0 0 24px 0; color: #1a1a1a; font-size: 24px; font-weight: bold;">Navigation Components</h2>

        <!-- Top Navigation -->
        <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px 0; color: #374151; font-size: 18px; font-weight: 600;">Top Navigation</h3>
          <nav style="display: flex; gap: 32px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #B8860B, #8B0000); border-radius: 8px;"></div>
              <span style="font-weight: bold; color: #1a1a1a;">Brand</span>
            </div>
            <div style="display: flex; gap: 24px; align-items: center; flex: 1;">
              <a href="#" style="color: #B8860B; text-decoration: none; font-weight: 500;">Home</a>
              <a href="#" style="color: #374151; text-decoration: none; font-weight: 500;">Products</a>
              <a href="#" style="color: #374151; text-decoration: none; font-weight: 500;">About</a>
              <a href="#" style="color: #374151; text-decoration: none; font-weight: 500;">Contact</a>
            </div>
            <button style="background: #B8860B; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500;">Sign In</button>
          </nav>
        </div>

        <!-- Breadcrumbs -->
        <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px 0; color: #374151; font-size: 18px; font-weight: 600;">Breadcrumbs</h3>
          <nav style="display: flex; align-items: center; gap: 8px; color: #666; font-size: 14px;">
            <a href="#" style="color: #B8860B; text-decoration: none;">Home</a>
            <span>/</span>
            <a href="#" style="color: #B8860B; text-decoration: none;">Products</a>
            <span>/</span>
            <a href="#" style="color: #B8860B; text-decoration: none;">Category</a>
            <span>/</span>
            <span style="color: #374151; font-weight: 500;">Current Page</span>
          </nav>
        </div>

        <!-- Tab Navigation -->
        <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px;">
          <h3 style="margin: 0 0 16px 0; color: #374151; font-size: 18px; font-weight: 600;">Tab Navigation</h3>
          <div style="border-bottom: 1px solid #e5e5e5;">
            <div style="display: flex; gap: 0; margin-bottom: -1px;">
              <button style="background: transparent; border: none; border-bottom: 2px solid #B8860B; padding: 12px 16px; color: #B8860B; font-weight: 600; cursor: pointer;">Overview</button>
              <button style="background: transparent; border: none; border-bottom: 2px solid transparent; padding: 12px 16px; color: #666; font-weight: 500; cursor: pointer;">Analytics</button>
              <button style="background: transparent; border: none; border-bottom: 2px solid transparent; padding: 12px 16px; color: #666; font-weight: 500; cursor: pointer;">Reports</button>
              <button style="background: transparent; border: none; border-bottom: 2px solid transparent; padding: 12px 16px; color: #666; font-weight: 500; cursor: pointer;">Settings</button>
            </div>
          </div>
          <div style="padding: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">Tab content goes here...</p>
          </div>
        </div>
      </div>
    `,
  },
];

export function PreviewDemo() {
  const [selectedPreset, setSelectedPreset] = useState(demoPresets[0]);

  return (
    <div className="h-screen bg-background">
      <div className="h-full border border-border bg-card">
        <EnhancedPreviewSystem
          content={selectedPreset.content}
          title={selectedPreset.name}
          description={selectedPreset.description}
          framework="html"
          presets={demoPresets}
          onPresetChange={presetId => {
            const preset = demoPresets.find(p => p.id === presetId);
            if (preset) {
              setSelectedPreset(preset);
            }
          }}
        />
      </div>
    </div>
  );
}

// Simple test cases for unit testing
export const testPreviewSystem = () => {
  const simpleContent = `
    <div style="padding: 20px; text-align: center;">
      <h1 style="color: #B8860B;">Test Component</h1>
      <p>This is a simple test for the preview system.</p>
      <button style="background: #B8860B; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
        Test Button
      </button>
    </div>
  `;

  return {
    content: simpleContent,
    title: 'Test Component',
    description: 'Simple test component for preview system validation',
  };
};
