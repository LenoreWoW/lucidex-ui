/**
 * Template Testing Utilities
 *
 * Simple tests to verify that templates load correctly and contain valid code snippets.
 */

import { templateService } from './template-service';
import { Template } from '@/types/templates';

interface TestResult {
  passed: boolean;
  message: string;
  details?: any;
}

interface TemplateTestSuite {
  templateId: string;
  templateName: string;
  tests: TestResult[];
  passed: boolean;
}

class TemplateTestRunner {
  private results: TemplateTestSuite[] = [];

  /**
   * Run all template tests
   */
  runAllTests(): {
    totalTemplates: number;
    passedTemplates: number;
    failedTemplates: number;
    results: TemplateTestSuite[];
  } {
    const templates = templateService.getAllTemplates();
    this.results = [];

    templates.forEach(template => {
      this.testTemplate(template);
    });

    const passedTemplates = this.results.filter(r => r.passed).length;
    const failedTemplates = this.results.filter(r => !r.passed).length;

    return {
      totalTemplates: templates.length,
      passedTemplates,
      failedTemplates,
      results: this.results,
    };
  }

  /**
   * Test a single template
   */
  private testTemplate(template: Template): void {
    const tests: TestResult[] = [];

    // Test 1: Template structure validation
    const validation = templateService.validateTemplate(template);
    tests.push({
      passed: validation.isValid,
      message: 'Template structure validation',
      details: validation.errors,
    });

    // Test 2: Required fields exist
    tests.push(this.testRequiredFields(template));

    // Test 3: Code snippets are valid
    tests.push(this.testCodeSnippets(template));

    // Test 4: Qatar GBA compliance
    tests.push(this.testQatarGBACompliance(template));

    // Test 5: Accessibility features
    tests.push(this.testAccessibilityFeatures(template));

    // Test 6: Responsive design
    tests.push(this.testResponsiveDesign(template));

    const allPassed = tests.every(test => test.passed);

    this.results.push({
      templateId: template.id,
      templateName: template.name,
      tests,
      passed: allPassed,
    });
  }

  /**
   * Test required fields
   */
  private testRequiredFields(template: Template): TestResult {
    const requiredFields = ['id', 'name', 'description', 'category', 'tags'];
    const missingFields = requiredFields.filter(
      field => !template[field as keyof Template]
    );

    if (missingFields.length > 0) {
      return {
        passed: false,
        message: 'Required fields missing',
        details: missingFields,
      };
    }

    return {
      passed: true,
      message: 'All required fields present',
    };
  }

  /**
   * Test code snippets
   */
  private testCodeSnippets(template: Template): TestResult {
    const issues: string[] = [];

    // Check if template has code snippets
    if (!template.codeSnippets || template.codeSnippets.length === 0) {
      return {
        passed: false,
        message: 'No code snippets found',
      };
    }

    // Check each code snippet
    template.codeSnippets.forEach((snippet, index) => {
      if (!snippet.language) {
        issues.push(`Snippet ${index + 1}: Missing language`);
      }

      if (!snippet.code || snippet.code.trim().length === 0) {
        issues.push(`Snippet ${index + 1}: Empty code`);
      }

      // Basic syntax validation for common languages
      if (snippet.language === 'react' || snippet.language === 'nextjs') {
        if (
          !snippet.code.includes('import') &&
          !snippet.code.includes('function') &&
          !snippet.code.includes('const')
        ) {
          issues.push(
            `Snippet ${index + 1}: React/Next.js code doesn't appear to be valid`
          );
        }
      }

      if (snippet.language === 'html') {
        if (!snippet.code.includes('<') || !snippet.code.includes('>')) {
          issues.push(
            `Snippet ${index + 1}: HTML code doesn't appear to be valid`
          );
        }
      }

      if (snippet.language === 'typescript') {
        if (
          !snippet.code.includes('interface') &&
          !snippet.code.includes('type') &&
          !snippet.code.includes('export')
        ) {
          issues.push(
            `Snippet ${index + 1}: TypeScript code doesn't appear to be valid`
          );
        }
      }
    });

    return {
      passed: issues.length === 0,
      message:
        issues.length === 0
          ? 'All code snippets are valid'
          : 'Code snippet issues found',
      details: issues,
    };
  }

  /**
   * Test Qatar GBA compliance
   */
  private testQatarGBACompliance(template: Template): TestResult {
    const issues: string[] = [];

    if (!template.qatarGBACompliant) {
      issues.push('Template is not marked as Qatar GBA compliant');
    }

    // Check if design tokens are used
    if (
      !template.metadata.designTokensUsed ||
      template.metadata.designTokensUsed.length === 0
    ) {
      issues.push('No Qatar GBA design tokens specified');
    }

    // Check for Qatar GBA specific classes in code snippets
    const hasQatarClasses = template.codeSnippets.some(
      snippet =>
        snippet.code.includes('qatar-primary') ||
        snippet.code.includes('qatar-neutral') ||
        snippet.code.includes('qatar-secondary')
    );

    if (!hasQatarClasses) {
      issues.push('No Qatar GBA CSS classes found in code');
    }

    return {
      passed: issues.length === 0,
      message:
        issues.length === 0
          ? 'Qatar GBA compliant'
          : 'Qatar GBA compliance issues',
      details: issues,
    };
  }

  /**
   * Test accessibility features
   */
  private testAccessibilityFeatures(template: Template): TestResult {
    const issues: string[] = [];

    if (!template.accessible) {
      issues.push('Template is not marked as accessible');
    }

    // Check for accessibility attributes in code
    const hasA11yFeatures = template.codeSnippets.some(snippet => {
      const code = snippet.code.toLowerCase();
      return (
        code.includes('aria-') ||
        code.includes('role=') ||
        code.includes('aria-label') ||
        code.includes('aria-describedby') ||
        code.includes('alt=') ||
        code.includes('aria-expanded') ||
        code.includes('aria-current')
      );
    });

    if (!hasA11yFeatures) {
      issues.push('No accessibility attributes found in code');
    }

    return {
      passed: issues.length === 0,
      message:
        issues.length === 0
          ? 'Accessibility features present'
          : 'Accessibility issues found',
      details: issues,
    };
  }

  /**
   * Test responsive design
   */
  private testResponsiveDesign(template: Template): TestResult {
    const issues: string[] = [];

    if (!template.responsive) {
      issues.push('Template is not marked as responsive');
    }

    // Check for responsive classes in code
    const hasResponsiveClasses = template.codeSnippets.some(snippet => {
      const code = snippet.code;
      return (
        code.includes('sm:') ||
        code.includes('md:') ||
        code.includes('lg:') ||
        code.includes('xl:') ||
        code.includes('2xl:') ||
        code.includes('flex-col') ||
        code.includes('grid-cols') ||
        code.includes('responsive')
      );
    });

    if (!hasResponsiveClasses) {
      issues.push('No responsive CSS classes found in code');
    }

    return {
      passed: issues.length === 0,
      message:
        issues.length === 0
          ? 'Responsive design implemented'
          : 'Responsive design issues',
      details: issues,
    };
  }

  /**
   * Get detailed test report
   */
  getDetailedReport(): string {
    const summary = this.runAllTests();

    let report = `
# Template Test Report

## Summary
- Total Templates: ${summary.totalTemplates}
- Passed: ${summary.passedTemplates}
- Failed: ${summary.failedTemplates}
- Success Rate: ${((summary.passedTemplates / summary.totalTemplates) * 100).toFixed(2)}%

## Template Results

`;

    summary.results.forEach(result => {
      report += `### ${result.templateName} (${result.templateId})
Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}

`;

      result.tests.forEach(test => {
        report += `- ${test.passed ? '✅' : '❌'} ${test.message}`;
        if (test.details && test.details.length > 0) {
          report += `\n  Details: ${JSON.stringify(test.details, null, 2)}`;
        }
        report += '\n';
      });

      report += '\n';
    });

    return report;
  }
}

/**
 * Run template tests and return results
 */
export function runTemplateTests() {
  const runner = new TemplateTestRunner();
  return runner.runAllTests();
}

/**
 * Get detailed template test report
 */
export function getTemplateTestReport(): string {
  const runner = new TemplateTestRunner();
  return runner.getDetailedReport();
}

/**
 * Quick template validation
 */
export function validateTemplatesQuick(): boolean {
  const results = runTemplateTests();
  return results.failedTemplates === 0;
}

export default TemplateTestRunner;
