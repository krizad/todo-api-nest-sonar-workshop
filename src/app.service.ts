import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // SonarQube Code Smell: High Cognitive Complexity & Magic Numbers
  complexMethod(a: number, b: number, c: number, d: number): void {
    if (a > 10) {
      if (b < 20) {
        if (c == 30) {
          if (d != 40) {
            console.log("Deeply nested");
          } else {
            console.log("Still nested");
          }
        }
      } else if (b == 25) {
        console.log("Magic number 25");
      }
    }
    
    // SonarQube Code Smell: Switch without default
    let x = a % 3;
    switch (x) {
      case 0:
        console.log("0");
        break;
      case 1:
        console.log("1");
        break;
      case 2:
        console.log("2");
        break;
    }
  }

  // SonarQube Blocker: Identical expressions on both sides of a binary operator
  // SonarQube Blocker: Value is uselessly assigned
  blockerIssue(a: number): boolean {
    if (a == a) { // Blocker
      console.log('Identical expressions');
    }
    let x = 0;
    x = x++; // Blocker
    return true;
  }

  // SonarQube High (Critical/Major): Two branches with exactly the same implementation
  // SonarQube High (Critical/Major): Empty catch block
  highIssue(): void {
    let b = 1;
    if (b === 1) {
      console.log('Duplicate branch');
    } else {
      console.log('Duplicate branch'); // High
    }

    try {
      console.log('Try block');
    } catch (e) {
      // High: Empty catch block
    }
  }

  // SonarQube Info (Minor/Info): Track uses of "TODO" tags
  infoIssue(): string {
    // TODO: This is an info level issue that needs to be resolved later. (Info)
    return "info";
  }
}
