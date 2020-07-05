<?php

namespace JackBradford\EasyCoffeeAtHome;
use JackBradford\Disphatch\Etc\UserManager;

class Validator {

    const EMAIL_VALIDATOR = 'EMAIL_VALIDATOR';
    const USERNAME_VALIDATOR = 'USERNAME_VALIDATOR';

    private $database;
    private $userManager;

    public function __construct(UserManager $userManager, $database) {

        $this->userManager = $userManager;
        $this->database = $database;
    }

    /**
     * @method Validators::validate
     * Validate a user input.
     *
     * @param string Validator
     * A constant referring to the validator.
     *
     * @param $input
     * The user input.
     *
     * @return object
     *  result.success => bool
     *  result.message => string
     *  result.data => obj
     */
    public function validate($validator, $input) {

        $validators = [
            self::EMAIL_VALIDATOR => 'email',
            self::USERNAME_VALIDATOR => 'username',
        ];
        return $this->attemptValidation($validator, $validators, $input);
    }

    /**
     * @method Validators::attemptValidation
     * Run the validation function.
     *
     * @return
     * @see Validators::validate
     */
    private function attemptValidation($validator, $validators, $input) {

        if (!array_key_exists($validator, $validators)) return false;
        return $this->{ $validators[$validator] }($input);
    }

    /**
     * @method Validators::email
     * The entry point of the email validator.
     *
     * @return
     * @see Validators::validate
     */
    private function email($input) {

        try {

            if (!is_string($input)) throw new \InvalidArgumentException();
            $this->userManager->getUser($input);
            $success = false;
            $message = "Email is already registered.";
        }
        catch (\InvalidArgumentException $iae) {

            $success = false;
            $message = "Internal server error.";
            error_log(__METHOD__ . ': Expected string.');
        }
        catch (\Exception $e) {

            $success = true;
            $message = "";
            if (!preg_match('/.+@{1,}.+/', $input)) {

                $success = false;
                $message = "Invalid email.";
            }
        }
        return (object) [
            'success' => $success,
            'message' => $message,
            'data' => (object)[],
        ];
    }

    /**
     * @method Validators::username
     * The entry point of the username validator.
     *
     * @return
     * @see Validators::validate
     */
    private function username($input) {

        $username = '';
        try {

            if (!is_string($input)) throw new \InvalidArgumentException();
            $username = $this->validateUsername($input);
            $success = true;
            $message = "Username is available.";
        }
        catch (\InvalidArgumentException $iae) {

            $success = false;
            $message = "Internal server error.";
            error_log(__METHOD__ . ': Expected string.');
        }
        catch (\Exception $e) {

            error_log($e->getMessage());
            $success = false;
            $message = $e->getMessage();
        }
        return (object) [
            'success' => $success,
            'message' => $message,
            'data' => (object) [
                'username' => $username,
            ]
        ];
    }

    /**
     * @method Validators::validateUsername
     * This method checks the input against the username criteria.
     *
     * Each username is stored in lowercase, so each input is converted to
     * that case before the checks are run.
     *
     * @return string
     * Returns the lowercase username. Throws an exception if the username is
     * invalid for any reason.
     */
    private function validateUsername(string $input) {

        $username = mb_strtolower($input);
        if (!preg_match('/.+/', $username)) {

            throw new \Exception('Username cannot be empty.');
        }
        if (preg_match('/(\W)/', $username)) {

            throw new \Exception('Username may only contain letters and numbers.');
        }
        if (mb_strlen($username) > 36) {

            throw new \Exception('Username may not exceed 36 characters.');
        }
        try {
                $results = $this->database->getConnection('default')->select(
                'select * from usernames where username = ?',
                [$username]
            );
        }
        catch (\Exception $e) {

            error_log($e->getMessage());
            throw new \Exception("Internal server error.");
        }
        if ($results) {
            throw new \Exception('Username is taken.');
        }
        return $username;
    }
}

