import { Application, ImageSource, Observable, Frame, Utils } from '@nativescript/core'
import { ios } from '@nativescript/core/application'

export class HelloWorldModel extends Observable {
  private _counter: number
  private _message: string

  constructor() {
    super()

    // Initialize default values.
    this._counter = 42
    this.updateMessage()

    // Let's share something in iOS.
    const image = ImageSource.fromFileSync("~/images/social.png")

    const activityController = UIActivityViewController.alloc()
      .initWithActivityItemsApplicationActivities([image], null);

    const presentViewController = activityController.popoverPresentationController;
    if (presentViewController) {
      const page = Frame.topmost().currentPage;
      if (page && page.ios.navigationItem.rightBarButtonItems &&
      page.ios.navigationItem.rightBarButtonItems.count > 0) {
      presentViewController.barButtonItem = page.ios.navigationItem.rightBarButtonItems[0];
    } else {
      presentViewController.sourceView = page.ios.view;
    }
  }

  const app = UIApplication.sharedApplication;
  const window = app.keyWindow || (app.windows && app.windows.count > 0 && app.windows[0]);
  const rootController = window.rootViewController;

  Utils.ios.getVisibleViewController(rootController)
    .presentViewControllerAnimatedCompletion(activityController, true, null);
  }
  

  get message(): string {
    return this._message
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value
      this.notifyPropertyChange('message', value)
    }
  }

  onTap() {
    this._counter--
    this.updateMessage()
    
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!'
    } else {
      this.message = `${this._counter} taps left`
    }
  }
}
